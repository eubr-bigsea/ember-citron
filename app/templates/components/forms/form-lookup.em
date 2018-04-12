.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      if loading
        span class="loading-datasources"
          i.mdi.mdi-loading.mdi-spin
      else
        select class="form-control" onchange={action 'valueChanged' value='target.value'}
          option
          each parsedValues as |opt|
            option selected={eq currentValue opt.key} value=opt.key
              =opt.value
