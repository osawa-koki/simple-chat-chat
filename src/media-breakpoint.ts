
const sm_point = 576;
const md_point = 768;
const lg_point = 992;
const xl_point = 1200;

const vw = window.innerWidth;

const media_breakpoint = {

  sm: {
    down: vw < sm_point,
    up: vw >= sm_point,
    only: vw >= sm_point && vw < md_point,
  },

  md: {
    down: vw < md_point,
    up: vw >= md_point,
    only: vw >= md_point && vw < lg_point,
  },

  lg: {
    down: vw < lg_point,
    up: vw >= lg_point,
    only: vw >= lg_point && vw < xl_point,
  },

  xl: {
    down: vw < xl_point,
    up: vw >= xl_point,
    only: vw >= xl_point,
  },

};

export default media_breakpoint;
