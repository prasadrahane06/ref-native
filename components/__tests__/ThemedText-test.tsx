import * as React from "react";
import renderer from "react-test-renderer";

import { AUIThemedText } from "../common/AUIThemedText";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<AUIThemedText>Snapshot test!</AUIThemedText>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
