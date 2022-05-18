import { Link, Outlet } from '@remix-run/react'
import { $path } from 'remix-routes'
import ExternalLink from '~/ui/external-link'
import SidebarLayout from '~/ui/sidebar-layout'

export default function Component() {
  return (
    <div className="relative isolate flex grow flex-col">
      <SidebarLayout>
        <SidebarLayout.Nav>
          <SidebarLayout.NavTitle>From scratch</SidebarLayout.NavTitle>
          <SidebarLayout.NavLink to={$path('/conf/01')}>
            01. Quick and dirty
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/02')}>
            02. Server validations
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/03')}>
            03. Type coercions
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/04')}>
            04. Client validations
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/05')}>
            05. Pending UI
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/06')}>
            06. Accessibility
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/07')}>
            07. Focus on error
          </SidebarLayout.NavLink>
          <SidebarLayout.NavTitle>Remix Forms</SidebarLayout.NavTitle>
          <SidebarLayout.NavLink to={$path('/conf/08')}>
            08. Default layout
          </SidebarLayout.NavLink>
          <SidebarLayout.NavLink to={$path('/conf/09')}>
            09. Custom layout
          </SidebarLayout.NavLink>
        </SidebarLayout.Nav>
        <SidebarLayout.Content>
          <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-4 sm:px-8">
            <Link to={$path('/conf')}>
              <svg
                viewBox="0 0 745 280"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[28px] w-[74px] sm:h-[35px] sm:w-[93px]"
              >
                <g transform="matrix(1,0,0,1,-227,-220)">
                  <path
                    d="M486.716,356.458C482.369,366.598 474.255,370.944 461.504,370.944C447.304,370.944 435.713,363.411 434.553,347.477L525.259,347.477L525.259,334.439C525.259,299.383 502.365,269.832 459.186,269.832C418.905,269.832 388.766,299.093 388.766,339.944C388.766,381.084 418.325,406 459.765,406C493.961,406 517.724,389.486 524.389,359.934L486.716,356.458ZM768.591,273.308L768.591,402.524L815.538,402.524L815.538,273.308L768.591,273.308ZM967.943,273.308L919.548,273.308L897.523,304.018L876.079,273.308L824.206,273.308L870.862,336.757L820.148,402.523L868.544,402.523L894.335,367.467L920.127,402.523L972,402.523L920.996,334.728L967.943,273.308ZM663.111,295.327C657.604,280.261 645.723,269.832 622.829,269.832C603.413,269.832 589.503,278.523 582.548,292.719L582.548,273.308L535.602,273.308L535.602,402.523L582.548,402.523L582.548,339.075C582.548,319.663 588.054,306.916 603.413,306.916C617.613,306.916 621.091,316.187 621.091,333.86L621.091,402.523L668.037,402.523L668.037,339.075C668.037,319.663 673.253,306.916 688.902,306.916C703.102,306.916 706.29,316.187 706.29,333.86L706.29,402.523L753.236,402.523L753.236,321.402C753.236,294.458 742.804,269.832 707.159,269.832C685.425,269.832 670.066,280.841 663.111,295.327ZM288.977,402.207L227,402.207L227,373.912L278.506,373.912C287.109,373.912 288.977,380.292 288.977,384.097L288.977,402.207ZM378.379,360.512C380.018,381.564 380.018,391.433 380.018,402.204L331.306,402.204C331.306,399.858 331.348,397.712 331.39,395.535C331.522,388.769 331.66,381.714 330.564,367.466C329.115,346.606 320.131,341.971 303.613,341.971L227,341.971L227,304.018L305.931,304.018C326.796,304.018 337.229,297.671 337.229,280.868C337.229,266.092 326.796,257.138 305.931,257.138L227,257.138L227,220L314.625,220C361.861,220 385.334,242.308 385.334,277.943C385.334,304.597 368.816,321.98 346.502,324.877C365.338,328.644 376.35,339.363 378.379,360.512ZM435.133,324.878C436.872,312.71 443.537,303.439 458.606,303.439C472.516,303.439 480.051,313.29 480.631,324.878L435.133,324.878ZM768.301,261.14L815.827,261.14L815.827,220L768.301,220L768.301,261.14Z"
                    fill="white"
                  ></path>
                </g>
                <g transform="matrix(11.3585,0,0,11.3585,-1948.42,-735.56)">
                  <path
                    d="M205.82,86.085C205.82,88.089 207.212,89.409 209.228,89.409C211.544,89.409 212.96,87.945 213.344,86.061L211.424,85.977C211.208,86.817 210.632,87.597 209.456,87.597C208.484,87.597 207.92,86.961 207.92,85.941C207.92,84.669 208.664,83.373 210.008,83.373C211.184,83.373 211.544,84.153 211.556,84.993L213.452,84.921C213.548,83.061 212.54,81.561 210.26,81.561C207.656,81.561 205.82,83.541 205.82,86.085ZM218.156,81.561C215.876,81.561 213.884,83.421 213.884,86.025C213.884,88.173 215.312,89.409 217.472,89.409C219.752,89.409 221.744,87.549 221.744,84.945C221.744,82.809 220.316,81.561 218.156,81.561ZM231.572,89.265L232.256,86.493L235.016,86.493L235.436,84.837L232.676,84.837L233.036,83.385L236.708,83.385L237.128,81.705L231.416,81.705L229.532,89.265L231.572,89.265ZM225.44,81.705L223.496,81.705L221.612,89.265L223.484,89.265L224.636,84.597L226.748,89.265L228.38,89.265L230.264,81.705L228.392,81.705L227.3,86.085L225.44,81.705ZM217.52,87.609C216.536,87.609 215.984,87.009 215.984,86.025C215.984,84.453 216.896,83.361 218.108,83.361C219.092,83.361 219.644,83.961 219.644,84.945C219.644,86.517 218.732,87.609 217.52,87.609Z"
                    fill="#d83bd2"
                  ></path>
                </g>
              </svg>
            </Link>
            <div className="hidden flex-1 text-center text-white lg:block">
              This is the{' '}
              <Link to={$path('/conf')} className="underline">
                interactive counterpart
              </Link>{' '}
              to our talk at Remix Conf 2022. Get the full slides{' '}
              <ExternalLink href="https://docs.google.com/presentation/d/1Mp961HsJD9qVElS5VD-szYJ9CkZhnVjJBwMfUahwwek/edit#slide=id.p">
                here
              </ExternalLink>
              .
            </div>
            <div className="flex-1 text-center text-white lg:hidden">
              Get the full slides{' '}
              <ExternalLink href="https://docs.google.com/presentation/d/1Mp961HsJD9qVElS5VD-szYJ9CkZhnVjJBwMfUahwwek/edit#slide=id.p">
                here
              </ExternalLink>
              .
            </div>
          </div>
          <div className="flex flex-col space-y-4 p-4 text-gray-200 sm:space-y-8 sm:p-8">
            <Outlet />
          </div>
        </SidebarLayout.Content>
      </SidebarLayout>
    </div>
  )
}
