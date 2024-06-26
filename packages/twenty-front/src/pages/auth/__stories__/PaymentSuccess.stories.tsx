import { getOperationName } from '@apollo/client/utilities';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { graphql, HttpResponse } from 'msw';

import { AppPath } from '@/types/AppPath';
import { GET_CURRENT_USER } from '@/users/graphql/queries/getCurrentUser';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { PrefetchLoadingDecorator } from '~/testing/decorators/PrefetchLoadingDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedOnboardingUsersData } from '~/testing/mock-data/users';

import { PaymentSuccess } from '../PaymentSuccess';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Auth/PaymentSuccess',
  component: PaymentSuccess,
  decorators: [PrefetchLoadingDecorator, PageDecorator],
  args: { routePath: AppPath.PlanRequiredSuccess },
  parameters: {
    msw: {
      handlers: [
        graphql.query(getOperationName(GET_CURRENT_USER) ?? '', () => {
          return HttpResponse.json({
            data: {
              currentUser: mockedOnboardingUsersData[0],
            },
          });
        }),
        graphqlMocks.handlers,
      ],
    },
  },
};

export default meta;

export type Story = StoryObj<typeof PaymentSuccess>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Start');
  },
};
