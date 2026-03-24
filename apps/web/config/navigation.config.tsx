import { Building, Home, User, List, MapPin, Gift, Layers, Calendar, Star, Map } from 'lucide-react';
import { z } from 'zod';

import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import pathsConfig from '~/config/paths.config';

const iconClasses = 'w-4';

const routes = [
  {
    label: 'common:routes.application',
    children: [
      {
        label: 'common:routes.home',
        path: pathsConfig.app.home,
        Icon: <Home className={iconClasses} />,
        end: true,
      },
      {
        label: 'common:routes.hotels',
        path: pathsConfig.app.hotels,
        Icon: <MapPin className={iconClasses} />,
      },
      {
        label: 'common:routes.locations',
        path: pathsConfig.app.locations,
        Icon: <Map className={iconClasses} />,
      },
      {
        label: 'common:routes.rooms',
        path: pathsConfig.app.rooms,
        Icon: <List className={iconClasses} />,
      },
      /* Facilities and Hotel Facilities merged into Hotels view */
      {
        label: 'common:routes.promotions',
        path: pathsConfig.app.promotions,
        Icon: <Gift className={iconClasses} />,
      },
      {
        label: 'common:routes.bookings',
        path: pathsConfig.app.bookings,
        Icon: <Calendar className={iconClasses} />,
      },
      {
        label: 'common:routes.reviews',
        path: pathsConfig.app.reviews,
        Icon: <Star className={iconClasses} />,
      }
    ],
  },
  {
    label: 'common:routes.settings',
    children: [
      {
        label: 'common:routes.profile',
        path: pathsConfig.app.profileSettings,
        Icon: <User className={iconClasses} />,
      },
    ],
  },
] satisfies z.infer<typeof NavigationConfigSchema>['routes'];

export const navigationConfig = NavigationConfigSchema.parse({
  routes,
  style: process.env.NEXT_PUBLIC_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
});
