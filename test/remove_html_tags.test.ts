import { removeHTMLTags } from '../ts_src/spell_checker/tokenize';


describe('Function removeHTMLTags', () => {
  it('remove simple HTML tags', () => {
    const testingString = 'This <p></p> is true';
    expect(removeHTMLTags(testingString)).toBe('This is true');

    const testingString2 = 'This <div></div> is true and this other <h1></h1> is false';
    expect(removeHTMLTags(testingString2)).toBe('This is true and this other is false');

    const testingString3 = 'A <p></p> B <p></p> C <p></p> D <p></p> E <p></p>';
    expect(removeHTMLTags(testingString3)).toBe('A B C D E');

    const testingString4 = '';
    expect(removeHTMLTags(testingString4)).toBe('');
  });

  it('remove simple HTML tags with attributes', () => {
    const testingString = 'This <p class="paragraph"></p> is true';
    expect(removeHTMLTags(testingString)).toBe('This is true');

    const testingString2 = 'This <div id="section"></div> is true and this other <h1 style="font-size:16px;"></h1> is false';
    expect(removeHTMLTags(testingString2)).toBe('This is true and this other is false');

    const testingString3 = 'A <p id="p-1" class="underline"></p> B <img src="./img.png" width="104" height="32"></img> C <p class="underlined"></p> D <p id="unique-paragraph"></p> E <p class="text-right"></p>';
    expect(removeHTMLTags(testingString3)).toBe('A B C D E');

    const testingString4 = '';
    expect(removeHTMLTags(testingString4)).toBe('');
  });

  it('remove open HTML tags', () => {
    const testingString = 'This <p> is true';
    expect(removeHTMLTags(testingString)).toBe('This is true');

    const testingString2 = 'This <div> is true and this other <h1> is false';
    expect(removeHTMLTags(testingString2)).toBe('This is true and this other is false');

    const testingString3 = 'A <p> B <p> C <p> D <p> E <p>';
    expect(removeHTMLTags(testingString3)).toBe('A B C D E');

    const testingString4 = '';
    expect(removeHTMLTags(testingString4)).toBe('');
  });


  it('remove nested HTML tags', () => {
    const testingString = '<p>This <i>is</i> <strong>true</strong></p>';
    expect(removeHTMLTags(testingString)).toBe('This is true');

    const testingString2 = '<div>This is <b>true</b> and this other is <strong>false</strong></div>';
    expect(removeHTMLTags(testingString2)).toBe('This is true and this other is false');

    const testingString3 = '<div><p>A <p>B <p>C <p>D <p>E</p></p></p></p></p></div>';
    expect(removeHTMLTags(testingString3)).toBe('A B C D E');

    const testingString4 =`
    <ul><li>1</li><li>2</li><li>3</li></ul>
    <ol><li>4</li><li>5</li></ol>
    `;
    expect(removeHTMLTags(testingString4)).toBe('1 2 3\n4 5');
  });
});