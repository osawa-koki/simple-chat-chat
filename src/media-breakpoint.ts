
const sm_point = 576;
const md_point = 768;
const lg_point = 992;
const xl_point = 1200;

class mq {

  vw = window.innerWidth;

  media_breakpoint = {

    sm: {
      down: this.vw < sm_point,
      up: this.vw >= sm_point,
      only: this.vw >= sm_point && this.vw < md_point,
    },

    md: {
      down: this.vw < md_point,
      up: this.vw >= md_point,
      only: this.vw >= md_point && this.vw < lg_point,
    },

    lg: {
      down: this.vw < lg_point,
      up: this.vw >= lg_point,
      only: this.vw >= lg_point && this.vw < xl_point,
    },

    xl: {
      down: this.vw < xl_point,
      up: this.vw >= xl_point,
      only: this.vw >= xl_point,
    },

  };

}

export default mq;
