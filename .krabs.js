module.exports = {
  tenants: [
    {
      name: "website-1",
      domains: [
        {
          dev: "local.test1.dev",
          stage: "stage.dayvista.dev",
          prod: "dayvista.dev",
        },
      ],
    },
    {
      name: "website-2",
      domains: [
        {
          dev: "local.test2.com",
          stage: "stage.juiseo.com",
          prod: "juiseo.com",
        },
      ],
    },
  ],
};
