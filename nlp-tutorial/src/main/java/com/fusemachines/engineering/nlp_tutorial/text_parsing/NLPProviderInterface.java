package com.fusemachines.engineering.nlp_tutorial.text_parsing;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.ParsedText;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.UserText;

public interface NLPProviderInterface {
	
	/**
	 * takes in a plain text (wrapped inside the UserText object) and spits out the parsedText
	 * @param text object that contains a text to be parsed/analyzed
	 * @return
	 */
	ParsedText parseText(UserText text);
}
