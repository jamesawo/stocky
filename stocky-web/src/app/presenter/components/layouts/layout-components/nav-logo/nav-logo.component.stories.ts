import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { NavLogoComponent } from './nav-logo.component';
import { NavLogoModule } from './nav-logo.module';

type ComponentWithCustomControls = NavLogoComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Nav Logo',
  component: NavLogoComponent,
  decorators: [
    moduleMetadata({
      imports: [NavLogoModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `NavLogo` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const NavLogo = Template.bind({});
NavLogo.args = {};
