import React from "react";
import Layout from "@theme/Layout";
import { useHistory } from "react-router-dom";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  return (
    <header>
      <div className={styles.container}>
        <img src="/img/blue.svg" />
        <p className={styles.tag_line}>
          Hydyco helps you to build your APIs fast 💨.
          <i> Simple alternative of </i>
          <a href="https://strapi.io/">Strapi.io</a>
        </p>
        <div className={styles.buttons}>
          <button
            className="button-blue-3d"
            onClick={() => {
              window.open("https://demo.hydyco.com", "_blank").focus();
            }}
          >
            {" "}
            Checkout demo
          </button>
          <span style={{ marginLeft: 10 }}></span>
          <button
            className="button-black-3d"
            onClick={() => {
              history.push("/docs/intro");
            }}
          >
            {" "}
            Start with docs ⏱️
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Hydyco helps you to build your APIs fast 💨"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
