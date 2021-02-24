import { supabase } from "src/lib/utils/initializers";

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
      {result.map((data) => {
        return <p>{data?.zip}</p>;
      })}
    </>
  ) : (
    <></>
  );
};

export default SsrTwo;
