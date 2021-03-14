import React from "react";
import { shallow } from "enzyme";
import withLocale from "../withLocalePage";
import type { NextPage } from "next";

describe("withLocalePage", () => {
  function setupVariables() {
    const commonProps = {
      asPath: "/",
      query: {},
      pathname: "/",
      AppTree: () => null,
    };

    const context = {
      locale: {
        language: "id",
        country: "id",
      },
      defaultLocale: "id-id",
      siteLocales: ["id-id", "en-id"],
    };

    const Page: NextPage = () => <div />;
    Page.getInitialProps = () => ({ init: true });

    const PageWithLocale = withLocale(Page);

    return { commonProps, context, Page, PageWithLocale };
  }

  describe("server", () => {
    it("should add default locale, locale, and site locales to page props", async () => {
      const { commonProps, context, Page, PageWithLocale } = setupVariables();
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        req: context as any,
      });
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });
  });

  describe("browser", () => {
    beforeEach(() => {
      process.browser = true;
    });

    afterEach(() => {
      process.browser = false;
    });

    it("should add default locale, locale, and site locales to page props", async () => {
      const { commonProps, context, Page, PageWithLocale } = setupVariables();
      window.__NEXT_DATA__ = {
        props: context,
      } as any;
      const props = await PageWithLocale.getInitialProps(commonProps);
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });

    it("should update locale if supported", async () => {
      const { commonProps, context, Page, PageWithLocale } = setupVariables();
      window.__NEXT_DATA__ = {
        props: context,
      } as any;
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        query: {
          locale: "en-id",
        },
      });
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });

    it("should not update locale if unsupported", async () => {
      const { commonProps, context, Page, PageWithLocale } = setupVariables();
      window.__NEXT_DATA__ = {
        props: context,
      } as any;
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        query: {
          locale: "en-sg",
        },
      });
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });
  });
});
