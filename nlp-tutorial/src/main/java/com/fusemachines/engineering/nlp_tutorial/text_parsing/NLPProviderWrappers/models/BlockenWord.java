package com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.models;

import java.util.List;

/**
 * {"score": score, "synonyms": synonymList, "tag": tag}
 * @author mars
 *
 */
public class BlockenWord {

	private double score;
	private List<String> synonyms;
	private String tag;
	/**
	 * {"score": score, "synonyms": synonymList, "tag": tag}
	 * @param score
	 * @param synonyms
	 * @param tag
	 */
	public BlockenWord(double score, List<String> synonyms, String tag) {
		this.score = score;
		this.synonyms = synonyms;
		this.tag = tag;
	}
	public double getScore() {
		return score;
	}
	public List<String> getSynonyms() {
		return synonyms;
	}
	public String getTag() {
		return tag;
	}

	@Override
	public String toString() {
		return "[ bloken-word = [ score = score, synonyms = synonyms, tag = tag ] ]";
	}
}
