import { removeTemplateVariables } from '../ts_src/spell_checker/tokenize';


describe('Function removeTemplateVariables', () => {
  it('remove i18n template variables', () => {
    const testingString = 'This %{value} is true';
    expect(removeTemplateVariables(testingString)).toBe('This  is true');

    const testingString2 = 'This %{value} is true and this other %{value_2} is false';
    expect(removeTemplateVariables(testingString2)).toBe('This  is true and this other  is false');

    const testingString3 = 'A %{value1} B %{value2} C %{value3} D %{value4} E %{value }';
    expect(removeTemplateVariables(testingString3)).toBe('A  B  C  D  E ');

    const testingString4 = '';
    expect(removeTemplateVariables(testingString4)).toBe('');
  });
});
