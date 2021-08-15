import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Visualize your project",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/1.png",
    description: <>Visual you project before you jump into coding</>,
  },
  {
    title: "Create your schema well",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/2.png",
    description: (
      <>On a click you can change your schema without touching code</>
    ),
  },
  {
    title: "Analyze your data",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/3.png",
    description: (
      <>
        Check your data,what is really getting stored. 🤫 you can edit and
        delete that data as well
      </>
    ),
  },
  {
    title: "Authorization was not this much easy",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/4.png",
    description: (
      <>
        Making routes authorized was never this much easy before, toggling a ✅
        does it all
      </>
    ),
  },
  {
    title: "Api Documentation is already there",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/6.png",
    description: (
      <>
        Api Documentation is ready to be used right away, it gets updated as
        soon as you add a new collection,
      </>
    ),
  },
  {
    title: "Manage your files",
    Svg: "https://raw.githubusercontent.com/iamrahultanwar/hydyco-preview/master/v1/7.png",
    description: <>Manage your files, upload delete , even bulk.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={Svg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
