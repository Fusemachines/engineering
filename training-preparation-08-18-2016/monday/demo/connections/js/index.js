/*jshint esversion:6 */
/**
* application name: Connections
* app has two global variables
* - CONNECTIONS holds configuration data and important functions/classes
* - CONNECTIONS_MANAGER
* @author Marcellin<mars@fusemachines.com>
*/
/* START management functions */
window.CONNECTIONS = (_ => {
  'use strict';
  /**
  * update the view whenever new entity data is fetched
  * display default info if no data provided
  * update is done by triggering registered events
  * - update-entity-view
  * @class EntityManager
  */
  class EntityManager {

    /**
    * @param entityEl { Node } DOM element that holds entity viewer elements
    * @param entiyObject { id: string, attributes: { text: string, properties: array<{ category: string, name: string }> }  }
    */
    constructor(
      entityEl,
      entiyObject = { attributes: { text: 'Entiy name here', properties: [] } }
    ) {
      console.assert(entityEl instanceof HTMLElement , 'entityEl should be a DOM element');

      this.initialize();

      this.entityEl = entityEl;
      this.entityNameEl = entityEl.querySelector('.entity-name');
      this.entityPropertiesEl = entityEl.querySelector('.entity-propert-list');
      // order of assignment is important
      this.entiyObject = entiyObject;
    }

    trigger(eventName, data) {
      console.log(arguments);
      this.LISTENERS[eventName].call(this, data);
    }

    set LISTENERS(value) {
      this._LISTENERS = value;
    }

    get LISTENERS() {
      return this._LISTENERS;
    }

    set entiyObject(value) {
      this._entiyObject = value;
      this.trigger('update-entity-view', value);
    }
    get entiyObject() {
      return this._entiyObject;
    }

    /**
    * add listeners to the list
    */
    initialize() {
      this.LISTENERS = this.LISTENERS || [];
      this.LISTENERS['update-entity-view'] = this.updateEntityView;
    }

    /**
    * method treated as an event listener
    * @method updateEntityView
    * @param entiyObject
    */
    updateEntityView(entiyObject) {
      console.log(arguments);
      let $entityNameEl = $(this.entityNameEl);
      let $entityPropertiesEl = $(this.entityPropertiesEl);

      // show entiy name
      $entityNameEl.text(entiyObject.attributes.text);

      // show entity properties
      $entityPropertiesEl.html('');
      entiyObject.attributes.properties.forEach(propertyObject => {
        let $propertyEl = $(`
          <li class="list-group-item">
          <span class="property-category">${propertyObject.category}</span> :
          <span class="property-name">${propertyObject.name}</span>
          </li>
          `);
          $entityPropertiesEl.append($propertyEl);
        });
      }
    }


    /**
    * update the view whenever a new list of connected entities is fetched
    * @class connectionManager
    */
    class ConnectionManager {
      /**
      * @param connectionObject { }
      */
      constructor(
        connectionsEl,
        connectionObject = { id: 0, path: 'N/A', entities: [] }
      ) {
        this.connectionsEl = connectionsEl;
        this.connectionNamesEl = connectionsEl.querySelector('.entity-name-list');

        this.noDataText = 'No connected entities provided';
        this.loadMoreText = 'Load more';

        this.connectionObject = connectionObject;
      }

      set connectionObject(value) {
        console.assert(value instanceof Object , 'Expects an object');
        console.assert(value.entities instanceof Array , 'Expects an object with an array inside it');

        this._connectionObject = value;
        this.updateEntityView(value);
      }
      get connectionObject() {
        return this._connectionObject;
      }

      /**
      * this where the actual updating task happens
      * @method updateEntityView
      * @param entiyObject
      */
      updateEntityView(connectionObject) {
        console.log(arguments);
        let $connectionNamesEl = $(this.connectionNamesEl);

        // show entity names
        $connectionNamesEl.html('');
        connectionObject.entities.forEach(connectionEntityName => {
          let $connectionEntityEl = $(`
            <a href="#" class="list-group-item">
            <h4 class="entity-name list-group-item-heading">${connectionEntityName}</h4>
            <p>connected through the ${connectionObject.path}</p>
            </a>
            `);
            $connectionNamesEl.append($connectionEntityEl);
          });

          let $connectionEntityEl = $(`
            <a href="#" class="list-group-item">
            <h4 class="entity-name list-group-item-heading">${(connectionObject.entities.length > 0)? this.loadMoreText: this.noDataText}</h4>
            </a>
            `);
            $connectionNamesEl.append($connectionEntityEl);

          }

        }

        /**
        * in charge of data management
        * - seach
        * - save
        * - update
        * - connection between backend and front-end
        */
        class DataManager {
          constructor() {

          }

          /**
          * javascipr based ajax caller
          * assumes that the app is running inside chrome browser
          */
          makeRequest(url) {
            return new Promise((resolve, reject) => {

              let httpRequest = new XMLHttpRequest();
              if (!httpRequest) {
                reject({ message: 'httpRequest is not available' });
                return false;
              }
              httpRequest.onreadystatechange = ({currentTarget, target}) => {
                let httpRequest = currentTarget;
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                  if (httpRequest.status === 200) {
                    resolve(JSON.parse(httpRequest.responseText || '{}'));
                  } else {
                    reject({ message: httpRequest.responseText, data: httpRequest });
                  }
                }
              };
              httpRequest.open('GET', url);
              httpRequest.send();

            });
          }

        }

        /**
        * handling everything related to search
        * and updating view once search data is available
        * - it uses DataManager internally
        */
        class SearchManager {
          constructor(
            searchForm,
            entityManager,
            connectionManager,
            options
          ) {
            this.searchForm = searchForm;
            this.entityManager = entityManager;
            this.connectionManager = connectionManager;
            this.dataManager = new DataManager();
            console.assert(this.dataManager instanceof DataManager, 'dataManager should be a DataManager instance');

            this.searchUrl = options.searchUrl;

            this.initialize();
          }

          initialize() {
            let $form = $(this.searchForm);
            $form.on('submit', this.searchData.bind(this));
          }

          searchData(evt) {
            evt.preventDefault();
            console.log('searchData', arguments, evt.target);
            this.dataManager.makeRequest(this.searchUrl)
            .then(({ data, included }) => {
              console.log('entities', data, included);
              let entity = data[0];
              let relationship =  entity.relationships.connections.data[0].id;
              let connectedEntitiesObject = included.find(e => e.id === relationship);
              let id = connectedEntitiesObject.id;
              console.log('after parsing', entity, relationship, connectedEntitiesObject, Object.assign({}, connectedEntitiesObject.attributes, {id}));
              this.entityManager.entiyObject = entity;
              this.connectionManager.connectionObject = Object.assign({}, connectedEntitiesObject.attributes, connectedEntitiesObject.id);

            });

          }
        }

        let APP_EL = document.querySelector('#application');
        // let SEARCH_URL = 'http://localhost/connections/js/fixture-data.json';
        let SEARCH_URL = 'js/fixture-data.json';
        return { APP_EL, SEARCH_URL, EntityManager, ConnectionManager, DataManager, SearchManager };
      })();
      /* END   management functions */

      window.CONNECTIONS_MANAGER = ($ => {
        'use strict';
        let parent = CONNECTIONS.APP_EL;
        let searchUrl = CONNECTIONS.SEARCH_URL;

        // parent should always be present
        let entityEl = parent.querySelector('#entity'),
        connectionsEl = parent.querySelector('#connection-list');

        let searchForm = entityEl.querySelector('.entity-search');

        // entity management
        let entityManager = new CONNECTIONS.EntityManager(entityEl);

        // connections management
        let connectionManager = new CONNECTIONS.ConnectionManager(connectionsEl);
        let searchManager = new CONNECTIONS.SearchManager(searchForm, entityManager, connectionManager, {searchUrl});

      })(jQuery);
