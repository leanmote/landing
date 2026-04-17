<<<<<<< HEAD
const base = import.meta.env.BASE_URL;

export const INTEGRATION_LOGOS = [
  { name: 'GitHub', src: base + 'logos/integrations/github.svg' },
  { name: 'GitLab', src: base + 'logos/integrations/gitlab.svg' },
  { name: 'Bitbucket', src: base + 'logos/integrations/bitbucket.svg' },
  { name: 'Jira', src: base + 'logos/integrations/jira.svg' },
  { name: 'Linear', src: base + 'logos/integrations/linear.svg' },
  { name: 'Asana', src: base + 'logos/integrations/asana.svg' },
  { name: 'Slack', src: base + 'logos/integrations/slack.svg' },
  { name: 'Discord', src: base + 'logos/integrations/discord.svg' },
  { name: 'Notion', src: base + 'logos/integrations/notion.svg' },
  { name: 'PagerDuty', src: base + 'logos/integrations/pagerduty.svg' },
  { name: 'Opsgenie', src: base + 'logos/integrations/opsgenie.svg' },
  { name: 'Zoom', src: base + 'logos/integrations/zoom.svg' },
=======
import github from '../../public/logos/integrations/github.svg';
import gitlab from '../../public/logos/integrations/gitlab.svg';
import bitbucket from '../../public/logos/integrations/bitbucket.svg';
import jira from '../../public/logos/integrations/jira.svg';
import linear from '../../public/logos/integrations/linear.svg';
import asana from '../../public/logos/integrations/asana.svg';
import slack from '../../public/logos/integrations/slack.svg';
import discord from '../../public/logos/integrations/discord.svg';
import notion from '../../public/logos/integrations/notion.svg';
import pagerduty from '../../public/logos/integrations/pagerduty.svg';
import opsgenie from '../../public/logos/integrations/opsgenie.svg';
import zoom from '../../public/logos/integrations/zoom.svg';

export const INTEGRATION_LOGOS = [
  { name: 'GitHub', src: github },
  { name: 'GitLab', src: gitlab },
  { name: 'Bitbucket', src: bitbucket },
  { name: 'Jira', src: jira },
  { name: 'Linear', src: linear },
  { name: 'Asana', src: asana },
  { name: 'Slack', src: slack },
  { name: 'Discord', src: discord },
  { name: 'Notion', src: notion },
  { name: 'PagerDuty', src: pagerduty },
  { name: 'Opsgenie', src: opsgenie },
  { name: 'Zoom', src: zoom },
>>>>>>> 9f00185 (feat: set English as default language and import images as module assets)
];
