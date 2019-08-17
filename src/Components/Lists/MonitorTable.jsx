import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function MonitorTable(props) {
  const rows = props.items.map(item=>{
    return(
      <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.protocol}</Table.Cell>
          <Table.Cell><Button className="btn" onClick={props.OnSelect.bind(item.id)} value="view Data">ViewData</Button></Table.Cell>
      </Table.Row>
    )
  })
  return (
    <div>
      {rows.length > 0 ? (<Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Protocol</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>) : (
        <h3 className="text-center">No sensors detected</h3>
      )}
    </div>
  )
}
