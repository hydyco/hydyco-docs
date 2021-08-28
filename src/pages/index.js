import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useHistory } from "react-router-dom";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
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
      title={`${siteConfig.title}`}
      description="Hydyco helps you to build your APIs fast 💨"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
