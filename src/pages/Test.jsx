import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Input,
  Slide,
  Tab,
  Text,
  Textarea,
} from "../elements/index";

import { Card } from "../components/index";

const Test = () => {
  const [input, setInput] = useState("");

  return (
    <React.Fragment>
      <Grid margin="50px 0 20px">
        <Text h1>Headline</Text>
        <Text h2>Subtitle1</Text>
        <Text h3>Subtitle2</Text>
        <Text>body1</Text>
        <Text body2>body2</Text>
        <Text body3>body3</Text>
      </Grid>
      <Button margin="0 0 20px">Button</Button>
      <Button outline margin="0 0 20px">
        Button outline
      </Button>
      <Button bc="red" margin="0 0 20px">
        Button bc="red"
      </Button>
      <Button width="100%" margin="0 0 20px">
        Button width="100%"
      </Button>
      <Flex margin="0 0 20px">
        <Button fg="1" margin="0 20px 0 0">
          Flex + Button fg="1"
        </Button>
        <Button fg="0">Flex + Button fg="0"</Button>
      </Flex>
      <Flex margin="0 0 20px">
        <Checkbox id={1}>Checkbox</Checkbox>
      </Flex>
      <Grid gtc="auto auto auto" rg="8px" cg="8px" margin="0 0 20px">
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
        <Card>Card in Grid (Grid: gtc="auto auto auto" rg="8px" cg="8px")</Card>
      </Grid>
      <Input label="Label" placeholder="Placeholder" margin="0 0 20px" />
      <Input
        label="Label"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="0 0 20px"
      />
      <Input
        label="Label"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="0 0 20px"
        icon
      />
      <Input
        label="Label"
        alert
        value="Value"
        alertMessage="alertMessage (with alert)"
        margin="0 0 20px"
        readOnly
      />
      <Textarea label="Label" placeholder="Placeholder" maxLength="200" />
      <Textarea label="Label" value="Value" maxLength="200" />
      <Textarea
        alert
        label="Label"
        value="Value"
        maxLength="200"
        alertMessage="alertMessage (with alert)"
      />
    </React.Fragment>
  );
};

export default Test;
