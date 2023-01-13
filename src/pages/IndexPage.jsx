import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

import styles from "./IndexPage.module.scss";

function IndexPage() {
  return (
    <Layout>
      <Navbar />

      <main className={styles.main}>
        <h1>Penalty Box Exercises</h1>
        <div>
          <h2>Stopwatch Test</h2>
          <p>
            Given example stopwatch times and penalty amounts, add the seconds
            for <i>Stand</i> and <i>Done</i>. Then check your result.
          </p>
          <p>
            Time Attack mode: Try to get as many correct <i>Stand</i> and{" "}
            <i>Done</i> pairs as possible in 2 minutes.
          </p>
          <Link to="stopwatch">Go to Stopwatch Test</Link>
        </div>
        <div>
          <h2>Sheet Test</h2>
          <p>
            Fill out a printed version of the penalty box sheet, then compare
            it.
          </p>
          <p>
            Time Attack mode: Fill out as many rows as you can in 2 minutes,
            then compare the results.
          </p>
          <Link to="sheet">Go to Sheet Test</Link>
        </div>
      </main>
    </Layout>
  );
}

export default IndexPage;
