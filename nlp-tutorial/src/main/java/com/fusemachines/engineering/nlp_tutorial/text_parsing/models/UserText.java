package com.fusemachines.engineering.nlp_tutorial.text_parsing.models;

public class UserText {

	// actual text sent by the user
	private String content;
	
	public UserText(String text) {
		this.content = text;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "[ bloken-phrase = [ score = score, complex-tokens = complex-tokens, simple-tokens = simple-tokens ] ]";
	}

}
