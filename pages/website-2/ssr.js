import { supabase } from "src/lib/utils/initializers";
import { default as NextLink } from "next/link";

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("starts_with_4").select("*");

  if (error) {
    console.log(error);
  }

  return {
    props: {
      result: error ? null : data,
    },
  };
};

const SsrTwo = ({ result }) => {
  return result ? (
    <>
      <NextLink href="/">
        <a>Link to home page</a>
      </NextLink>
      {result.map((data) => {
        return (
          <div
            style={{
              display: "flex",
              width: "100vw",
              margin: "2vh 0",
              justifyContent: "space-evenly",
            }}
          >
            <p>{`Row ID: ${data?.id}`}</p>
            <p>{data?.zip}</p>
            <p>{data?.lat}</p>
            <p>{data?.long}</p>
          </div>
        );
      })}
    </>
  ) : (
    <></>
  );
};

export default SsrTwo;
