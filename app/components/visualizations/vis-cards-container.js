import Ember from 'ember';

export default Ember.Component.extend({
  visualizations: [
    {
      name:   "Correlation Matrix",
      icon:   "fa-list",
      image:  "icon-th-outline",
      link:   "'job.visualization' model.id 'correlation-matrix'",
      tooltip: "Correlation Metrics comments Authors x Law Articles.",
    },
    {
      name:   "Sentiment Analysis",
      icon:   "fa-list",
      image:  "icon-emo-thumbsup",
      link:   "'job.visualization' model.id 'sentiment-analysis'",
      tooltip: "Sentiment Analysis metrics of comments in law articles.",
    },
    {
      name:   "Topicos",
      icon:   "fa-bar-chart",
      image:  "icon-newspaper",
      link:   "'job.visualization' model.id 'topicos-vis'",
      tooltip: "This visualization shows a table between topics and axis.",
    },
    {
      name:   "Word Tree",
      icon:   "icon-flow-tree",
      image:  "icon-flow-split",
      link:   "'job.visualization' model.id 'wordtree-diagram'",
      tooltip: "Wordtree Analysis visualization of all of the filtered comments.",
    },
    {
      name:   "Search Tool",
      icon:   "fa-search",
      image:  "icon-search",
      link:   "'job.visualization' model.id 'search-tool'",
      tooltip: "Exploratory Tool which can be used to search the filtered comments.",
    },
    {
      name:   "Co-ocurrence",
      icon:   "icon-flow-tree",
      image:  "icon-comment-1",
      link:   "'job.visualization' model.id 'graph-canvas'",
      tooltip: "Co-ocurrence visualization of words within filtered comments.",
    },
    {
      name:   "Co-ocurrence - Full Data",
      icon:   "icon-flow-tree",
      image:  "icon-chat-2",
      link:   "'job.visualization' model.id 'graph-canvas-full'",
      tooltip: "Co-ocurrence visualization of words within filtered comments.",
    },
    {
      name:   "Participants - Itens",
      icon:   "icon-flow-tree",
      image:  "icon-users",
      link:   "'job.visualization' model.id 'part-item'",
      tooltip: "Graph showing relationship between participants and commentables.",
    },
  ],
});
