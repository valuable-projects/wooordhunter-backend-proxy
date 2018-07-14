// @flow

const fs = require('fs');

const parse = require('./index');

const english = fs.readFileSync(`${__dirname}/fixtures/english.html`).toString();
const russian = fs.readFileSync(`${__dirname}/fixtures/russian.html`).toString();

describe('parser', () => {
  describe('when receives page with english word', () => {
    it('should return object with word information', () => {
      const result = parse('test', english);

      expect(result).toEqual({
        transcription: { uk: '|ˈtest|', us: '|test|' },
        nouns: [
          'испытание; проба, проверка; опробование',
          'мерило, пробный камень; серьёзное испытание; критерий',
          'проверочная или контрольная работа; экзамен',
          'психол. тест',
          'исследование; анализ; опыт, проба, реакция',
          'пробирная чашка',
          'хим. реактив',
          'сокр. от test',
          'match',
          'рел. отречение от признания папской власти и догмата пресуществления',
          'зоол. панцирь; щит; скорлупа',
        ],
        verbs: [
          'подвергать испытанию; испытывать, проверять; опробовать',
          'быть мерилом',
          'проверять, убеждаться',
          '(for) пробоваться (на роль)',
          'обнаруживать определённые свойства в результате испытаний',
        ],
        mainMeaning: 'испытание, тест, проверка, испытательный, пробный, тестировать, проверять',
        phrases: [
          'alternate bend test — испытание на изгиб',
          'to road-test a car — испытывать автомашину на дороге',
          'to carry out a test — проводить испытание',
          'test for completeness — проверка на полноту',
          'test for concordance — критерий согласия',
          'conditional test — условный критерий',
          'to run a test cut — снимать пробную стружку',
          'to test for defects — проверять на наличие дефектов',
          'to fail a test — не выдерживать испытания',
          'to carry out / conduct / do / run a test — проводить, делать анализ',
        ],
        language: 'english',
        word: 'test',
      });
    });
  });

  describe('when receives page with russian word', () => {
    it('should return object with word information', () => {
      const result = parse('университет', russian);

      expect(result).toEqual({
        transcription: { uk: '', us: '' },
        nouns: [],
        verbs: [],
        mainMeaning: '',
        phrases: [
          'заочный университет — open university',
          'основать университет — to establish / found a university',
          'окончить университет — to graduate from the university',
          "народный университет — people's university",
          'университет штата Юта — university of utah',
          'престижный университет — prestige university',
          'провинциальный университет — provincial university',
          'исследовательский университет — research university',
          'заявление о приёме в университет — application for admission to a university',
          "на дорогу в университет нужен час — an hour's commute from the university",
          'поехать (поступать) в университет — to go up to the university',
          'осмотреть Московский университет — to tour the Moscow University',
          'только что окончивший университет — piping hot from the university',
          'университет на общественных началах — para university',
          'абитуриент, поступивший в университет — successful candidate for admission to the university',
          'университет, предоставляющий общежитие — residential university',
          'осмотреть Московский университет [музей] — to tour the Moscow University [the museum]',
          'бросить университет за месяц до окончания — to quit the University a month short of graduation',
          'сдавать вступительные экзамены в университет — to take examinations for entry to a university',
          'держать вступительные экзамены в университет — sit for university entrance',
          'университет штата (содержится на местные средства) — state university',
          'государственный университет - высшая школа экономики — state university - higher school of economics',
          'поехать (поступать) в университет [в Оксфорд, в Кембридж] — to go up to the university [to Oxford, to Cambridge]',
          "чтобы четырнадцатилетний мальчик поступил в университет — it's unheard-of for a boy of fourteen to gain university entrance",
          "моё заявление о назначении стипендии было опять переслано в университет — I've had my application for a grant referred back to the University",
          'закончить университет и вернуться домой (особ. об Оксфордском и Кембриджском университетах) — to be down from a University',
        ],
        commonMeanings: [
          'university - университет, университетская спортивная команда',
          'college - колледж, коллегия, университет, высшее учебное заведение, корпорация',
          'campus - кампус, университет, территория университета',
          'varsity - университет',
          'University - университет, университетская спортивная команда',
        ],
        language: 'russian',
        word: 'университет',
      });
    });
  });
});
