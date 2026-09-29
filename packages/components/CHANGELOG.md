# @ds/components

## 0.1.0

Initial release.

- 7 core primitives: Button, Input, Checkbox, Radio, Select, Badge, Icon.
- 7 composites: Modal, Dropdown, Tabs, Toast, Card, Table, Tooltip.
- All components consume `@ds/tokens` exclusively — no hardcoded visual values.
- CSS exported separately as `@ds/components/css` (Vite library builds strip CSS side-effect imports from the JS bundle, so this must be imported explicitly alongside the component import).
