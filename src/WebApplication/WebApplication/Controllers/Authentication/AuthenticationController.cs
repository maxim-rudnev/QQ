using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using IdentityServer4.Services;
using WebApplication.Service.IdentityService;
using IdentityServer4.Events;
using WebApplication.Models.Authentication;
using IdentityServer4.Extensions;

namespace WebApplication.Controllers.Authentication
{
    public class AuthenticationController : ControllerBase
    {
        private readonly IIdentityServerInteractionService interactionService;

        private readonly IEventService eventService;

        private readonly IUserService userService;
        public AuthenticationController()
        {
            this.interactionService = interactionService ?? throw new ArgumentNullException(nameof(interactionService));
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
            this.userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPost]
        [Route("api/sign-in")]
        public async Task<IActionResult> SignIn([FromBody]SignInApplicationModel signIn)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var validationResult = this.userService.Authenticate(signIn.Username, signIn.Password);
            if (!validationResult.IsSuccess)
            {
                await this.eventService.RaiseAsync(new UserLoginFailureEvent(signIn.Username, "неверные учетные данные"));
                return this.Unauthorized();
            }

            await this.eventService.RaiseAsync(new UserLoginSuccessEvent(
                username: signIn.Username,
                subjectId: validationResult.SubjectId,
                name: signIn.Username));

            // состояния сеанса аутентификации как в cookies если 
            // пользователь ны выбрал "Запомнить меня"
            AuthenticationProperties props = null;

            // пользователь выбрал "Запомнить меня"
            if (signIn.RememberLogin)
            {
                props = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.Add(TimeSpan.FromDays(30)),
                };
            }

            // установка cookie с идентификатором и именем пользователя
            await this.HttpContext.SignInAsync(
                subject: validationResult.SubjectId,
                name: signIn.Username,
                properties: props);

            // Redirect на начальную страницу 
            return this.Ok(new
            {
                uri = "/",
            });
        }

        [HttpPost]
        [Route("api/sign-out")]
        public async Task<IActionResult> SignOut([FromBody] SignOutApplicationModel signOut)
        {
            if (this.User?.Identity?.IsAuthenticated == false)
            {
                return this.Ok();
            }

            // Delete local cookie
            await this.HttpContext.SignOutAsync();

            await this.eventService.RaiseAsync(
                new UserLogoutSuccessEvent(this.User.GetSubjectId(), this.User.GetDisplayName()));

            return this.Ok();
        }


    }
}