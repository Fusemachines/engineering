package com.fusemachines.engineering.nlp_tutorial.text_parsing;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.ParsedText;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.UserText;

/**
 * call the provider and process the parsing request
 * @author mars
 *
 */
public class Service {
	private static Service instance = null;
	public ParsedText parse(UserText userText) {
		
		// @DONE call parse from Fusemachines = fuse-nlp
		NLPProviderInterface nlp = NLPProviderFactory.getProvider(NLPProviderType.FUSEMACHINES);
		ParsedText parsedText = nlp.parseText(userText);
		return parsedText;
	}

	public static Service getInstance() {
		if(instance == null) {
			instance = new Service();
		}
		return instance;

	}

}
