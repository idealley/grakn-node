# Grakn Node.js Client

A Node.js client for [Grakn](https://grakn.ai)

Requires Grakn 0.16.0

# Installation

To install the Grakn client, simply run:

```
npm install grakn-node
```

You will also need access to a Grakn database. Head [here](https://grakn.ai/pages/documentation/get-started/setup-guide.html) to get started with Grakn.

# Quickstart

Begin by importing the Grakn graph:

```
>>> var GraknGraph = require('grakn-node');
```

Now you can connect to a graph:

```
>>> var graph = new GraknGraph('http://localhost:4567', 'keyspace');
```

You can write to the graph:

```
>>> graph.execute('insert person sub entity;')
[]
>>> graph.execute('insert name sub resource, datatype string;')
[]
>>> graph.execute('insert person has name;')
[]
>>> graph.execute('insert $bob isa person, has name "Bob";')
['1234']
```

Or read from it:

```
>>> graph.execute('match $bob isa person, has name $name; select $name;')
[{'name': {'isa': 'name', 'id': '3141816', 'value': 'Bob'}}]
```
