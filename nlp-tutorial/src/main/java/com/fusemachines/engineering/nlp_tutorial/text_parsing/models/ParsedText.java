package com.fusemachines.engineering.nlp_tutorial.text_parsing.models;

import java.util.List;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.models.BlockenPhrase;

/**
 * response object sent to the user
 * @author mars
 *
 */
public class ParsedText {
	private String input;
	private List<BlockenPhrase> output; // result of the parsing action
	
	public ParsedText(String input, List<BlockenPhrase> output) {
		this.input = input;
		this.output = output;
	}

	/**
	 * @return the output
	 */
	public List<BlockenPhrase> getOutput() {
		return output;
	}

	/**
	 * @return the input
	 */
	public String getInput() {
		return input;
	}

	@Override
	public String toString() {
		return "[ parsed-text = [ input = stringText, output = parsed_chunks ] ]";
	}
	
}
