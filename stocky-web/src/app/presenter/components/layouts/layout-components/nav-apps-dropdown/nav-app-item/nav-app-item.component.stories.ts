import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { NavAppItemComponent } from './nav-app-item.component';
import { NavAppItemModule } from './nav-app-item.module';

type ComponentWithCustomControls = NavAppItemComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Nav App Item',
  component: NavAppItemComponent,
  decorators: [
    moduleMetadata({
      imports: [NavAppItemModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `NavAppItem` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const NavAppItem = Template.bind({});
NavAppItem.args = {};
