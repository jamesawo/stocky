import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { EmptyComponent } from './empty.component';
import { EmptyModule } from './empty.module';

type ComponentWithCustomControls = EmptyComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Empty',
  component: EmptyComponent,
  decorators: [
    moduleMetadata({
      imports: [EmptyModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Empty` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const Empty = Template.bind({});
Empty.args = {};
