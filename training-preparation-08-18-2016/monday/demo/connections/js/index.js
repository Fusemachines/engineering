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

        // we need to be able to search using any of the connected entities
        // this.connectionNamesEl.removeEventListener('click', this.searchAgain.bind(this), true);
        this.connectionNamesEl.addEventListener('click', this.searchAgain.bind(this), true);

        this.noDataText = 'No connected entities provided';
        this.loadMoreText = 'Load more';

        this.connectionObject = connectionObject;

        /*
         * this class manages data provided to it
         * if user request modification to the data then this class will send
         * the request to the data owner (SearchManager) so that it can make necessary
         * modifications then provided updated data to this class.
         */
         /*
          * in order to do that, we use a simple subscription model where
          * any class can subscribe to provided topics.
          * then ConnectionManager class will notify them every-time there is work
          * to be done.
          * all registered classes must have a "notify" method
          */
        this.subscribers = {
          'search-again': []
        };
        // freezing the subscribers object allows us to prevent outsiders from
        // adding or removing topics
        Object.freeze(this.subscribers);
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
        let $connectionNamesEl = $(this.connectionNamesEl);

        // show entity names
        $connectionNamesEl.html('');
        connectionObject.entities.forEach(connectionEntityName => {
          let $connectionEntityEl = $(`
            <a href="#" class="connected-entity list-group-item" data-search-value="${connectionEntityName}">
            <h4 class="entity-name list-group-item-heading">${connectionEntityName}</h4>
            <p>connected through the ${connectionObject.path}</p>
            </a>
            `);
            $connectionNamesEl.append($connectionEntityEl);

          });

          // connection list may be long so we paginate the list and allow users
          // to request more if they are interested
          let $connectionEntityEl = $(`
            <a href="#" class="load-more-class list-group-item">
            <h4 class="entity-name list-group-item-heading">${(connectionObject.entities.length > 0)? this.loadMoreText: this.noDataText}</h4>
            </a>
            `);
            $connectionNamesEl.append($connectionEntityEl);
            // debugger;
            // when event is triggered, the function runs twice

            $connectionNamesEl.off('click').on('click', '.load-more-class', connectionObject, (event) => {
              event.preventDefault();
              console.log('load more', event, event.data, arguments, this);
            });

          }
          /**
           * This class does not have the right to search
           * so it tells the search manager to do it\
           */
          searchAgain(event) {
            event.preventDefault();
            // console.log('search again', this, event, event.target, arguments);
            // argument for "search-again" topic is { source: {}, query: string }
            let query;
            let source = $(event.target);
            if (source.hasClass('connected-entity')) {
              query = source.data('searchValue');
            } else {
              source = source.parents('.connected-entity');
              if (source.length === 1) {
                query = source.data('searchValue');
              }
            }
            if (query) {
              this.notifyAll('search-again', event, { source, query });
            }
          }
          /**
           * @TODO is it possible to send different data to different subscribers
           * @param eventData
           */
          notifyAll(eventType, event, data) {
            this.subscribers[eventType].forEach(subscriber => {
              subscriber.notify(event, data);
            });
          }
          subscribe(eventType, subscriber) {
            this.subscribers[eventType].push(subscriber) ;
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
            this.httpRequest = new XMLHttpRequest();

          }

          /**
          * javascipr based ajax caller
          * assumes that the app is running inside chrome browser
          */
          makeRequest(url) {
            return new Promise((resolve, reject) => {
              let httpRequest = this.httpRequest;

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
         * this class is the data owner (all data modification logic is done in here)
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
            // make sure only one submit event is registered
            $form.off('submit').on('submit', this.searchDataHandler.bind(this));
            this.connectionManager.subscribe('search-again', this);
          }
          /**
           * this method is required by connectionManager subscription system
           * @TODO how does the subscription system know what kind of data to send during notification process?
           * @param searchInput { source: {}, query: string }
           */
          notify(event, searchInput) {
            // console.log('hi there notify notify notify', event, searchInput);
            let $form = $(this.searchForm);
            $form.find('input[name="entity-search-box"]').val(searchInput.query);
            $form.trigger('submit');
          }

          set data(value) {
            this._data = value;
          }
          get data() {
            return this._data;
          }

          searchData(inputData) {
            console.log('searchData', inputData);
            // let url = `${this.searchUrl}?q=${inputData.query}`
            let url = this.searchUrl;
            this.dataManager.makeRequest(url)
            .then(({ data, included }) => {
              console.log('entities', data, included);
              let entity = data[0];
              let relationship =  entity.relationships.connections.data[0].id;
              let connectedEntitiesObject = included.find(e => e.id === relationship);
              let id = connectedEntitiesObject.id;
              let connections = Object.assign({}, connectedEntitiesObject.attributes, { id });
              console.log('after parsing', entity, relationship, connectedEntitiesObject, connections);
              this.entityManager.entiyObject = entity;
              this.connectionManager.connectionObject = connections;

              this.data = { entity, connections };

            });

          }
          searchDataHandler(evt) {
            evt.preventDefault();
            let source = $(evt.target);
            let query = source.find('input[name="entity-search-box"]').val();
            console.log('searchDataHandler', arguments, evt.target, query);
            if (query) {
              this.searchData({ source, query });
            }
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
