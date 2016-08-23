package com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.models;

import java.util.List;

/**
 * 
 * @author mars
 * @version 0.0.1
 * @since 06-14-2016
 */
public class BlockenPhrase {
	private double score;

	public double getScore() {
		return score;
	}

	private List<BlockenWord> broken_words;
	private List<String> string_tokens;

	/**
	 * { "score": score, "complex-tokens": parsed_tokens, "simple-tokens": string_tokens }
	 * @param score
	 * @param broken_words
	 *            i call this broken_words because i still don't understand what
	 *            a token is
	 * @param string_tokens
	 */
	public BlockenPhrase(double score, List<BlockenWord> broken_words,
			List<String> string_tokens) {
		this.score = score;
		this.broken_words = broken_words;
		this.string_tokens = string_tokens;
	}

	/**
	 * @return the string_tokens
	 */
	public List<String> getString_tokens() {
		return string_tokens;
	}

	/**
	 * @return the broken_words
	 */
	public List<BlockenWord> getBroken_words() {
		return broken_words;
	}

	@Override
	public String toString() {
		return "[ bloken-phrase = [ score = score, complex-tokens = complex-tokens, simple-tokens = simple-tokens ] ]";
	}

}
