import { FormEvent, ReactNode } from 'react';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { Json } from 'enzyme-to-json';

export interface AspectRatioProps {
    children: ReactNode;
    ratio: AspectRatios;
}

export enum AspectRatios {
    '1:1' = 100,
    '16:9' = 56.25,
    '4:3' = 75,
}

export interface ButtonProps {
    children: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export interface FormField {
    label: string;
    max?: number;
    min?: number;
    placeholder?: string;
    type?: string;
    valid?: boolean;
    validation?: RegExp;
    value?: number | string;
}

export interface FormProps {
    ariaLabel: string;
    fields: {
        [field: string]: FormField;
    };
    onSubmit: (e: FormEvent) => void;
}

export interface Image {
    id: string;
    created_at: string;
    updated_at: string;
    color: string;
    description: string;
    alt_description: string;
    categories: string[];
    likes: number;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        bio: string;
        location: string;
        profile_image: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
    };
    url: string;
}

export interface ImageProps {
    alt: string;
    round?: boolean;
    src: string;
    width?: string;
}

export interface ImagesProps {
    columns: number;
}

export interface SerializerMap extends Json {
    node: {
        type: {
            componentStyle?: {
                baseStyle?: {
                    rules: (string | ((props: StyledProps) => string))[];
                };
                rules: (string | ((props: StyledProps) => string))[];
            };
        };
    };
}

export type StyledProps<P = unknown> = { theme: Theme } & P;

export interface Theme {
    colors: {
        blue: string;
        red: string;
        yellow: string;
    };
}

export interface WebpackConfig {
    devServer: { historyApiFallback: boolean; open: boolean };
    entry: string[];
    mode: string;
    module: {
        rules: WebpackRule[];
    };
    output: { path?: string; publicPath: string };
    plugins: any[];
    resolve: { extensions: string[] };
}

interface WebpackRule {
    exclude?: (RegExp | string)[];
    test: RegExp;
    use: {
        loader: string;
        options?: { plugins: string[] };
    };
}
