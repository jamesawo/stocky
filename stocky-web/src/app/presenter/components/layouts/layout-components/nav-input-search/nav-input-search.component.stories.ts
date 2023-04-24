import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { NavInputSearchComponent } from './nav-input-search.component';
import { NavInputSearchModule } from './nav-input-search.module';

type ComponentWithCustomControls = NavInputSearchComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Nav Input Search',
  component: NavInputSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [NavInputSearchModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `NavInputSearch` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const NavInputSearch = Template.bind({});
NavInputSearch.args = {};
