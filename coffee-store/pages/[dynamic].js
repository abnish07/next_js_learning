import Head from "next/head";
import { useRouter } from "next/router";

const Dynamic = () => {
  const router = useRouter();
  const query = router.query.dynamic;
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Dynamic component {query}
    </div>
  );
};

export default Dynamic;
