module.exports = {
  tenants: [
    {
      name: "website-1",
      domains: [
        {
          dev: "local.dayvista.dev",
          stage: "stage.dayvista.dev",
          prod: "dayvista.dev",
        },
      ],
    },
    {
      name: "website-2",
      domains: [
        {
          dev: "local.juiseo.com",
          stage: "stage.juiseo.com",
          prod: "juiseo.com",
        },
      ],
    },
  ],
};
