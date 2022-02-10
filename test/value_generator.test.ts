import { valueGenerator } from '../ts_src/spell_checker/value_generator';

describe ('valueGenerator function', () => {

  test('returns null with the wrong data', () => {
    const obj = {};
    const generator: Generator<string, null, object | undefined > = valueGenerator(obj);
    const item = generator.next();
    expect(item.value).toBe(null);
    expect(item.done).toBeTruthy();
  });

  test('returns a generator with right data', () => {
      const obj = {
        message1: 'Hello World',
        message2: {
          dogName: 'Pancho is the name of my dog'
        },
        message3: {
          cat: {
            catName: {
              name: 'Manchi'
            }
          }
        }
      };
      const generator: Generator<string, null, object | undefined > = valueGenerator(obj);
      let item = generator.next();
      expect(item.value).toBe('Hello World');
      expect(item.done).toBeFalsy();
      item = generator.next();
      expect(item.value).toBe('Pancho is the name of my dog');
      expect(item.done).toBeFalsy();
      item = generator.next();
      expect(item.value).toBe('Manchi');
      expect(item.done).toBeFalsy();
      item = generator.next();
      expect(item.done).toBeTruthy();
  });
});
