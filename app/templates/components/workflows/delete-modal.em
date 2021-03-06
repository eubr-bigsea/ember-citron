= bs-modal class=componentCssClassName open=deleteModal backdropClose=true fade=fade onHidden=(action (mut deleteModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon.mdi.mdi-alert
      span.__text: t 'workflows.delete-modal.title' count=count workflow=workflow
  modal.body
    .wrapper
      h5: = t 'workflows.delete-modal.message' count=count workflow=workflow
  modal.footer
    = bs-button onClick=deleteWorkflow class="btn-danger"
      t 'workflows.delete-modal.delete-btn'
    = bs-button onClick=(action (mut deleteModal) false)
      t 'workflows.delete-modal.cancel'
