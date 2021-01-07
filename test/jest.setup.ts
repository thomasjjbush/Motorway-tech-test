import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import { SerializerMap } from '../types';
import { Plugin } from 'pretty-format';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(
    (createSerializer({
        map: (value: SerializerMap) => {
            if (value.node.type?.componentStyle?.rules) {
                const styles = [
                    ...(value.node.type.componentStyle.baseStyle?.rules ?? []),
                    ...value.node.type.componentStyle.rules.map((rule) =>
                        typeof rule === 'string'
                            ? rule
                            : rule({
                                  ...value.props,
                                  theme: {
                                      colors: {
                                          blue: 'theme.colors.blue',
                                          red: 'theme.colors.red',
                                          yellow: 'theme.colors.yellow',
                                      },
                                  },
                              }),
                    ),
                ]
                    .filter(Boolean)
                    .join('')
                    .replace(/,(?!\s)/gm, '');

                return { ...value, props: { ...value.props, styles } };
            }
            return value;
        },
    }) as unknown) as Plugin,
);
