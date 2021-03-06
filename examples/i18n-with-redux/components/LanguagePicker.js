import PropTypes from "prop-types";
import { withLocale } from "soya-next/i18n";
import LocaleLink from "soya-next/link";
import { localeShape } from "soya-next/prop-types";
import Dictionary from "../components/Dictionary";

const LanguagePicker = ({ locale, siteLocales }) => (
  <div style={{ textAlign: "right" }}>
    {siteLocales.map(siteLocale => {
      const [language, country] = siteLocale.split("-");
      const style = { marginLeft: 5 };
      if (locale.language === language && locale.country === country) {
        style.color = "white";
        style.background = "red";
      }
      return (
        <LocaleLink key={siteLocale} locale={{ language, country }}>
          <a style={style}>
            <Dictionary locale={{ language, country }} entryKey="language" />
          </a>
        </LocaleLink>
      );
    })}
  </div>
);

LanguagePicker.propTypes = {
  locale: localeShape.isRequired,
  siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default withLocale(LanguagePicker);
