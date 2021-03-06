(function () {
  'use strict';

  describe('horizon.framework.util.filters', function () {
    beforeEach(module('horizon.framework.util.i18n'));
    beforeEach(module('horizon.framework.util.filters'));

    describe('yesno', function () {
      var yesnoFilter;
      beforeEach(inject(function (_yesnoFilter_) {
        yesnoFilter = _yesnoFilter_;
      }));

      it('returns Yes for true', function () {
        expect(yesnoFilter(true)).toBe('Yes');
      });

      it('returns No for false', function () {
        expect(yesnoFilter(false)).toBe('No');
      });

      it('returns No for null', function () {
        expect(yesnoFilter(null)).toBe('No');
      });

      it('returns No for undefined', function () {
        expect(yesnoFilter(undefined)).toBe('No');
      });

      it('returns Yes for other truthy values', function () {
        expect(yesnoFilter(7)).toBe('Yes');
        expect(yesnoFilter('C')).toBe('Yes');
        expect(yesnoFilter('This will be truthy')).toBe('Yes');
      });

      it('returns No for other falsy values', function () {
        expect(yesnoFilter(0)).toBe('No');
        expect(yesnoFilter('')).toBe('No');
      });
    });

    describe('gb', function () {
      var gbFilter;
      beforeEach(inject(function (_gbFilter_) {
        gbFilter = _gbFilter_;
      }));

      it('returns given numeric value properly', function () {
        expect(gbFilter(12)).toBe('12 GB');
        expect(gbFilter(-12)).toBe('-12 GB');
        expect(gbFilter(12.12)).toBe('12.12 GB');
      });

      it('returns empty string for non-numeric', function () {
        expect(gbFilter('humbug')).toBe('');
      });

      it('returns empty string for null', function () {
        expect(gbFilter(null)).toBe('');
      });
    });

    describe('mb', function () {
      var mbFilter;
      beforeEach(inject(function (_mbFilter_) {
        mbFilter = _mbFilter_;
      }));

      it('returns given numeric value properly', function () {
        expect(mbFilter(12)).toBe('12 MB');
        expect(mbFilter(-12)).toBe('-12 MB');
        expect(mbFilter(12.12)).toBe('12.12 MB');
      });

      it('returns empty string for non-numeric', function () {
        expect(mbFilter('humbug')).toBe('');
      });

      it('returns empty string for null', function () {
        expect(mbFilter(null)).toBe('');
      });
    });

    describe('title', function () {
      var titleFilter;
      beforeEach(inject(function (_titleFilter_) {
        titleFilter = _titleFilter_;
      }));

      it('capitalizes as expected', function () {
        expect(titleFilter('title')).toBe('Title');
        expect(titleFilter('we have several words')).toBe('We Have Several Words');
      });

      it('handles non-strings correctly', function () {
        expect(titleFilter(42)).toBe(42);
        expect(titleFilter(null)).toBe(null);
        expect(titleFilter(undefined)).toBe(undefined);
      });

      it('does not mess up properly capitalized strings', function () {
        expect(titleFilter('I Love OpenStack Horizon!')).toBe('I Love OpenStack Horizon!');
      });

      it('handles strings beginning with numbers', function () {
        expect(titleFilter('3abc')).toBe('3abc');
      });
    });

    describe('noUnderscore', function () {
      var noUnderscoreFilter;
      beforeEach(inject(function (_noUnderscoreFilter_) {
        noUnderscoreFilter = _noUnderscoreFilter_;
      }));

      it('replaces all underscores with spaces', function () {
        expect(noUnderscoreFilter('_this_is___a_lot____of_underscores__'))
          .toBe(' this is   a lot    of underscores  ');
      });

      it('returns non-string input', function () {
        expect(noUnderscoreFilter(null)).toBe(null);
        expect(noUnderscoreFilter(false)).toBe(false);
        expect(noUnderscoreFilter(true)).toBe(true);
        expect(noUnderscoreFilter('')).toBe('');
        expect(noUnderscoreFilter(21)).toBe(21);
      });
    });

    describe("decode", function () {
      var decodeFilter;
      beforeEach(inject(function (_decodeFilter_) {
        decodeFilter = _decodeFilter_;
      }));

      it("Returns value when key is present", function () {
        expect(decodeFilter('PRESENT', {'PRESENT': 'Here'})).toBe('Here');
      });

      it("Returns value when key is present and value is falsy", function () {
        expect(decodeFilter('PRESENT', {'PRESENT': false})).toBe(false);
      });

      it("Returns input when key is not present", function () {
        expect(decodeFilter('NOT_PRESENT', {'PRESENT': 'Here'})).toBe('NOT_PRESENT');
      });
    });

    describe('bytes', function () {
      var bytesFilter;
      beforeEach(inject(function (_bytesFilter_) {
        bytesFilter = _bytesFilter_;
      }));

      it('returns TB values', function () {
        expect(bytesFilter(1099511627776)).toBe('1.00 TB');
      });

      it('returns GB values', function () {
        expect(bytesFilter(1073741824)).toBe('1.00 GB');
      });

      it('returns MB values', function () {
        expect(bytesFilter(1048576)).toBe('1.00 MB');
      });

      it('returns KB values', function () {
        expect(bytesFilter(1024)).toBe('1.00 KB');
      });

      it('returns byte values', function () {
        expect(bytesFilter(0)).toBe('0 bytes');
        expect(bytesFilter(1)).toBe('1 bytes');
        expect(bytesFilter(1023)).toBe('1023 bytes');
      });

      it('handles non-numbers correctly', function () {
        expect(bytesFilter('Yo!')).toBe('');
        expect(bytesFilter(null)).toBe('');
      });
    });

    describe('itemCount', function () {
      it('should return translated text with item count',
        inject(function (itemCountFilter) {
          expect(itemCountFilter(null)).toBe('Displaying 0 items');
          expect(itemCountFilter(undefined)).toBe('Displaying 0 items');
          expect(itemCountFilter(true)).toBe('Displaying 1 item');
          expect(itemCountFilter(false)).toBe('Displaying 0 items');
          expect(itemCountFilter('a')).toBe('Displaying 0 items');
          expect(itemCountFilter('0')).toBe('Displaying 0 items');
          expect(itemCountFilter('1')).toBe('Displaying 1 item');
          expect(itemCountFilter('1e1')).toBe('Displaying 10 items');
          expect(itemCountFilter('1b1')).toBe('Displaying 0 items');
          expect(itemCountFilter(0)).toBe('Displaying 0 items');
          expect(itemCountFilter(1)).toBe('Displaying 1 item');
          expect(itemCountFilter(1.2)).toBe('Displaying 1 item');
          expect(itemCountFilter(1.6)).toBe('Displaying 2 items');
          expect(itemCountFilter(-1)).toBe('Displaying 0 items');
          expect(itemCountFilter(-1.2)).toBe('Displaying 0 items');
        })
      );
    });

    describe('trans', function () {
      it('should return translated text', inject(function (transFilter) {
        expect(transFilter("Howdy")).toBe("Howdy");
      }));
    });
  });
})();
