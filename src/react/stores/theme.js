import Reflux from 'reflux';
import themeActions from '../actions/theme';
import Parser from '../api/parser';

var themeStore = Reflux.createStore({
    listenables: [themeActions],
    data: {
      filePath: null,
      saturatePercentage: 50,
      brightnessPercentage: 50,
      showOptions: false,
      themeContentDefault: null,  /* default theme content */
      themeContentNew: null, /* new generated theme content */
      colors: [], /* array of colors */
      blockedColors: []
    },
    onUploadTheme(filePath) {
      this.data.showOptions = true;
      let themeContent = fs.readFileSync(filePath, 'utf8');
      this.data.filePath = filePath;
      this.data.themeContent = themeContent;
      this.updateTheme();
    },
    onRemoveBlockColor(color) {
      let blockedColors = this.data.blockedColors;
      let index = blockedColors.indexOf(color);
      blockedColors.splice(index, 1);
      this.data.blockedColors = blockedColors;
      this.updateTheme();
    },
    onBlockColor(color) {
      let blockedColors = this.data.blockedColors;
      if (blockedColors.indexOf(color) === -1) {
        blockedColors.push(color);
      }
      this.data.blockedColors = blockedColors;
      this.updateTheme();
    },
    onSaveTheme(filePath) {
      let newFilePath = path.dirname(process.execPath) + '/out/' + this.data.filePath.replace(/^.*[\\\/]/, '');
      fs.writeFile(newFilePath, this.data.themeContentNew);
    },
    updateTheme() {
      let generate = Parser.generate(this.data.themeContent, this.data.saturatePercentage, this.data.brightnessPercentage, this.data.blockedColors);
      this.data.themeContentNew = generate.newThemeContent;
      this.data.colors = generate.colors;
      this.trigger(this.data);
    },
    onSetRange(saturate, brightness) {
      this.data.saturatePercentage = saturate;
      this.data.brightnessPercentage = brightness;
      this.trigger(this.data);
      this.updateTheme();
    },
    getInitialState() {
      return this.data;
    }
});

export default themeStore;