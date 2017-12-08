# Grakn Node.js Client

A Node.js client for [Grakn](https://grakn.ai)

Requires Grakn 0.18.0

# Installation

To install the Grakn client, simply run:

```
npm install grakn
```

You will also need access to a Grakn database. Head [here](https://grakn.ai/pages/documentation/get-started/setup-guide.html) to get started with Grakn.

# Quickstart

Begin by importing the Grakn graph:

```
>>> const GraknGraph = require('grakn');
```

Now you can connect to a graph:

```
>>> const graph = new GraknGraph('http://localhost:4567', 'keyspace');
```

You can write to the graph:

```
>>> graph.execute('insert person sub entity;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert name sub resource, datatype string;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert person has name;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert $bob isa person, has name "Bob";').then((resp) => { console.log(resp); });
['1234']
```

Or read from it:

```
>>> graph.execute('match $bob isa person, has name $name; select $name;')
         .then((resp) => { console.log(resp); })
         .catch((err) => { console.error(err); });
[{'name': {'isa': 'name', 'id': '3141816', 'value': 'Bob'}}]
```


# API Reference

#### `GraknGraph([uri],[keyspace])`

Constructor function that accepts two optional parameters:

- **uri**: default `http://localhost:4567`. URI of running graph.
- **keyspace**: default `grakn`. Keyspace name.

---

#### `execute(query, [infer, materialise])`

It executes query against the running graph. It returns a Promise.

It accepts two optional parameters:

- **infer**: default is **true**. Determine if inference must be used for the current query.
- **materialise**: default is **false**. Determine if inferred results must be persisted in the graph.
---