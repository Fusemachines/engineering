package com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers;

import java.util.List;
import java.util.stream.Collectors;

import com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderInterface;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.models.BlockenPhrase;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.NLPProviderWrappers.models.BlockenWord;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.ParsedText;
import com.fusemachines.engineering.nlp_tutorial.text_parsing.models.UserText;

import dragon.fusenlp.Chunk;
import dragon.fusenlp.ParseTree;
import dragon.fusenlp.Token;
import dragon.fusenlp.parser.Parser;
import dragon.fusenlp.parser.ParserFactory;
import dragon.fusenlp.parser.ParserType;

public class Fusemachines implements NLPProviderInterface {
	private static Fusemachines instance = null;

	@Override
	public ParsedText parseText(UserText text) {
		//collect input
		String stringText = text.getContent();
		
		// get Fusemachines parser
		Parser myParser = ParserFactory.getParser(ParserType.FULLPARSER);
//		Parser myParser = ParserFactory.getParser(ParserType.OPENNLP);
//		Parser myParser = ParserFactory.getParser(ParserType.STANFORD);
		
		// create the nlp tree that contain words/word phrases along with their grammatical meaning
		ParseTree tree = myParser.parse(stringText);

		// @TODO what is a chunk?
		List<Chunk> chunks =  tree.getChunks();
		System.out.println("=== chunks ===");
		System.out.println(tree.toString());
		System.out.println(chunks);
		System.out.println("=== chunks ===");
		
		// create a JSON array that contains all chunks
		List<BlockenPhrase> parsed_chunks = chunks.stream().map(chunk -> {
			double score = chunk.getScore();
			
			// @TODO what is a token?
			List<Token> raw_tokens = chunk.getTokensList();
			
			// create a JSON object that contains all tokens
			// @TODO assume a Token is a Word or WordPhrase
			List<BlockenWord> parsed_tokens = raw_tokens.stream().map(token -> {
				double token_score = token.getScore();
				List<String> synonyms = token.getSynonymList();
				String tag = token.getTag();
				
				// {"score": score, "synonyms": synonymList, "tag": tag}
				return new BlockenWord(token_score, synonyms, tag);
			}).collect(Collectors.toList());

			// tokens represented as string 
			List<String> string_tokens = chunk.getTokensListAsStrings();
			
//			{ "score": score, "complex-tokens": parsed_tokens, "simple-tokens": string_tokens }
			return new BlockenPhrase(score, parsed_tokens, string_tokens);
		}).collect(Collectors.toList());

		
		// add the broken phrases to our result ( = ParsedText )
		ParsedText parsedText = new ParsedText(stringText, parsed_chunks);
		
		return parsedText;
	}

	public static NLPProviderInterface getInstance() {
		if(instance == null) {
			instance = new Fusemachines();
		}
		return instance;
	}
	
	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		
		UserText userText = new UserText("how are you?");
		Fusemachines nlp = new Fusemachines();
		ParsedText parsedText = nlp.parseText(userText);
		
		System.out.println(parsedText);
	}

}
