import OverViewCard from "../model/overview-card";

const cards = [
  new OverViewCard({
    title: "A",
    color: "teal",
    icon: "mdi-robot",
    path: "/",
  }),
  new OverViewCard({
    title: "B",
    color: "warning",
    icon: "mdi-sitemap",
    path: "/",
  }),
  new OverViewCard({
    title: "C",
    color: "error",
    icon: "mdi-factory",
    path: "/",
  }),
  new OverViewCard({
    title: "D",
    color: "primary",
    unit: "GB",
    icon: "mdi-database",
    path: "/",
  }),
];

export default cards;
