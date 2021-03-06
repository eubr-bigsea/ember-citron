.btn.btn-primary#open-operations-list onclick={action "toggleSidebar"}
  i.fa.fa-angle-left.arrow#open-menu href="#"
.items-search
  form.form-inline onsubmit="return false"
    .input-group
      =input id="input" type="search" class="form-control boxed " placeholder=(t 'workflows.searchFor') value=filterText autocomplete='off'
      span.input-group-btn
        button.btn.btn-secondary#submit
          i.fa.fa-search
.operations-list#operations-list
  ul.metismenu#categories-list
    if (eq filterText "")
      each groupedOperations as | elementArray |
        = each-in elementArray as |group subgroup|
          if (eq group "_data")
            each subgroup as |operation|
              =workflows/operation-element  operation=operation
          else
            li
              a href="#"
                i class="fa fa-th-large"
                span
                  = group
              ul
                each subgroup as |subElements|
                  = each-in subElements as |op elements|
                    if (eq op "_data")
                      each elements as |element|
                        = workflows/operation-element operation=element
                    else
                      li
                        a href="#"
                          i class="fa fa-th-large"
                          span
                            =op
                        ul
                         = each-in elements as |sub element|
                            each element as |el|
                              = workflows/operation-element operation=el
    else
      each filteredResults as |operation|
        li
          =workflows/operation-element operation=operation

