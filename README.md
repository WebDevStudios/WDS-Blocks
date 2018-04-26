# WDS Blocks

WebDevStudios library of Gutenberg blocks used to build awesome client websites.

<a href="https://webdevstudios.com/contact/"><img src="https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png" alt="WebDevStudios. WordPress for big brands."></a>

## Available Blocks

- Hero
- Call To Action
- Multi-select Recent Posts
- Multi-select Related Posts
- Two Column
- Github Gist

WDS Blocks also come with a robust set of options: background image, video, and color support. Plus, text color, custom CSS classes, and [Animate.css](https://daneden.github.io/animate.css/) support. These blocks have been tested with our starter theme, [wd_s](https://github.com/WebDevStudios/wd_s).

## Usage

You must have the [WordPress Gutenberg](https://wordpress.org/plugins/gutenberg/) plugin installed and activated.

- [Clone](https://github.com/WebDevStudios/wds-gutenberg.git) or download a .zip this repo
- Place into `/plugins/`
- Activate this plugin

Head on over to a post or page and start inserting WDS Blocks!

![screenshot](https://dl.dropbox.com/s/twp4cmpz6oyj193/Screenshot%202018-04-26%2011.50.12.png?dl=0)

## Documentation

Head on over to the [Wiki](https://github.com/WebDevStudios/wds-blocks/wiki) to read up on the docs.

## Development

Your [contributions](https://github.com/WebDevStudios/wds-blocks/blob/master/.github/CONTRIBUTING.md) are welcome. Here's a quick start guide to developing with WDS Blocks.

### File structure
- Blocks are stored in the `/src/blocks/` directory. These are the blocks that users can insert into posts in the wp-admin.
- Components are stored in the `/src/components/` directory. These individual components can can be imported into and used by one or more blocks. Example: If block A and block B both display a dropdown of recent posts, a recent posts component could be created, then imported into and used by both of those blocks.

Please use the following file naming convention for all blocks for consistency:

    my-block
        ├── editor.scss   (styles for the backend only)
        ├── endpoints.php (any REST API endpoints)
        ├── icon.js       (the block's SVG icon)
        ├── index.js      (required to register the block)
        ├── render.php    (the PHP render callback function for dynamic blocks)
        └── style.scss    (styles for both frontend & backend)

`index.js` is the only file that is required, since that's where the block is registered. Beyond any listed above, your block can also include additional files, as needed - just give them names that make sense.

### How to add a new block

1. Inside of `/src/blocks/`, duplicate the `default` block and rename it.
1. Inside of that new directory, open the `index.js` file. This is where the call to `registerBlockType()` to register the block needs to be.
1. Inside of `/src/blocks.js`, add a line like the following to import your new block: `import './blocks/my-block';`. This will ensure that you're new block is included in the webpack build process.
1. For any other JS or SCSS files your block uses, be sure to `import` them from within `index.js`. Any PHP files included in your block's directory will be loaded up automatically – you don't need to worry about adding `require`/`include` statements anywhere.
1. Namespace any PHP files using the name of your block, such as: `namespace WDS\Gutenberg\blocks\my_block;`.

### Code syntax and formatting
- Please write all JavaScript using modern ES6+/ESNext syntax. Webpack is configured to transpile all JS down into ES5 syntax that will work on all browsers, so don't hesitate to use modern JS language features in your code that aren't fully supported by all major browsers yet.
- The project contains an `.eslintrc.json` file that contains JS linting rulesets. Please turn on linting in your editor and format your JS code accordingly.

### NPM Commands

### `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

## Contributing

Your contributions are welcome. Please follow the [contribution guidelines](https://github.com/WebDevStudios/wds-blocks/blob/master/.github/CONTRIBUTING.md).

## Credits

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

<br/><br/>
[![wds-logo](https://dl.dropboxusercontent.com/s/71hvyg2dsjj2ubh/webdevstudios-goots-logo.png?dl=0)](https://webdevstudios.com)