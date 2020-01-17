if (!TASK_CONFIG.svgSprite) return;

const gulp = require("gulp");
const path = require("path");
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const projectPath = require("../lib/projectPath");

const svgSpriteTask = function() {
  const settings = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.icons.src, "*.svg"),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
  };

  return gulp
    .src(settings.src)
    .pipe(
      svgmin({
        plugins: [
          { removeXMLNS: true },
          { prefixIDs: true },
          { cleanupIDs: { force: true } }
        ]
      })
    )
    .pipe(svgstore(TASK_CONFIG.svgSprite.svgstore))
    .pipe(gulp.dest(settings.dest));
};

const { alternateTask = () => svgSpriteTask } = TASK_CONFIG.svgSprite;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);
gulp.task("svgSprite", task);
module.exports = task;
