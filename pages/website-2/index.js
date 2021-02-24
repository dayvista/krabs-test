import { default as NextLink } from "next/link";

const WebsiteTwo = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        margin: "2vh 0",
        alignItems: "center",
      }}
    >
      <p>this is website 2</p>
      <NextLink href="/ssr">
        <a>link to SSR page</a>
      </NextLink>
    </div>
  );
};

export default WebsiteTwo;
