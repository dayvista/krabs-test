import { supabase } from "src/lib/utils/initializers";

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("starts_with_3").select("*");

  if (error) {
    console.log(error);
  }

  return {
    props: {
      result: error ? null : data,
    },
  };
};

const SsrOne = ({ result }) => {
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

export default SsrOne;
