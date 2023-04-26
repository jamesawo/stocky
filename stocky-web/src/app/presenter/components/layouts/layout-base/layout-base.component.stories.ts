import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { LayoutBaseComponent } from './layout-base.component';
import { LayoutBaseModule } from './layout-base.module';

type ComponentWithCustomControls = LayoutBaseComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Layout Base',
  component: LayoutBaseComponent,
  decorators: [
    moduleMetadata({
      imports: [LayoutBaseModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `LayoutBase` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const LayoutBase = Template.bind({});
LayoutBase.args = {};
